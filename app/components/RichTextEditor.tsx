'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useCallback, useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung...',
}: RichTextEditorProps) {
  const handleImageUpload = useCallback(async (file: File) => {
    try {
      console.log('Starting image upload...', { fileName: file.name, fileSize: file.size });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'editor');

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Không thể upload ảnh');
      }

      console.log('Upload successful:', data.url);
      return data.url;
    } catch (error) {
      console.error('Image upload error:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Có lỗi xảy ra khi upload ảnh'
      );
      return null;
    }
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        // Disable link trong StarterKit vì chúng ta dùng Link extension riêng
        link: false,
      }),
      Underline,
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value || '',
    immediatelyRender: false,
    editable: true, // Luôn editable, sẽ được enable sau khi mount
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      // Sync content khi component mount
      if (value) {
        editor.commands.setContent(value);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] px-4 py-3',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            handleImageUpload(file).then((url) => {
              if (url && editor) {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                if (coordinates) {
                  const node = schema.nodes.image.create({ src: url });
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                }
              }
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const items = event.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith('image/')) {
              event.preventDefault();
              const file = item.getAsFile();
              if (file) {
                handleImageUpload(file).then((url) => {
                  if (url && editor) {
                    const { schema } = view.state;
                    const node = schema.nodes.image.create({ src: url });
                    const transaction = view.state.tr.replaceSelectionWith(node);
                    view.dispatch(transaction);
                  }
                });
              }
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;

      const url = await handleImageUpload(file);
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
  }, [editor, handleImageUpload]);

  // Enable editor khi đã mount
  useEffect(() => {
    if (editor && isMounted) {
      editor.setEditable(true);
    }
  }, [editor, isMounted]);

  // Sync content khi value thay đổi từ bên ngoài (khi edit bài viết)
  useEffect(() => {
    if (editor && isMounted && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor, isMounted]);

  // Chỉ render editor khi đã mount trên client
  if (!isMounted || !editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 min-h-[300px] bg-white">
        <p className="text-gray-500">Đang tải editor...</p>
      </div>
    );
  }

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap items-center gap-2">
        {/* Text formatting */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded text-sm font-semibold transition-colors ${
              editor.isActive('bold')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded text-sm italic transition-colors ${
              editor.isActive('italic')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded text-sm underline transition-colors ${
              editor.isActive('underline')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Underline (Ctrl+U)"
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded text-sm line-through transition-colors ${
              editor.isActive('strike')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Strikethrough"
          >
            S
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded text-sm font-bold transition-colors ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-sm font-bold transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded text-sm font-bold transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Numbered List"
          >
            1.
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Align Left"
          >
            ⬅
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Align Center"
          >
            ⬌
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Align Right"
          >
            ➡
          </button>
        </div>

        {/* Link & Image */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              const url = window.prompt('Nhập URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`px-2 py-1 rounded text-sm transition-colors ${
              editor.isActive('link')
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            title="Insert Link"
          >
            🔗
          </button>
          <button
            onClick={addImage}
            className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            title="Insert Image"
          >
            🖼️
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
            className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Remove Link"
          >
            🔗❌
          </button>
        </div>

        {/* Clear formatting */}
        <div className="flex items-center gap-1 border-l border-gray-300 pl-2 ml-auto">
          <button
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="px-2 py-1 rounded text-sm bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Custom styles */}
      <style jsx global>{`
        .rich-text-editor .ProseMirror {
          min-height: 300px;
          padding: 1rem;
          outline: none;
        }
        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .rich-text-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }
        .rich-text-editor .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }
        .rich-text-editor .ProseMirror ul,
        .rich-text-editor .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .rich-text-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        .rich-text-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        .rich-text-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}
