import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Indent,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Outdent,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Subscript,
  Superscript,
  Table2,
  Underline,
  Unlink,
  Undo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { isHtmlBlogContent, renderBlogMarkdown } from "@/lib/blog";

export interface RichTextEditorHandle {
  focus: () => void;
  insertLink: (label: string, url: string) => void;
  insertImage: (url: string, alt?: string) => void;
}

const normalizeEditorValue = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "<p><br></p>" || trimmed === "<div><br></div>") {
    return "";
  }
  return trimmed;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type BlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote" | "pre";

const ToolbarButton = ({
  onClick,
  title,
  children,
  active = false,
}: {
  onClick: () => void;
  title: string;
  children: ReactNode;
  active?: boolean;
}) => (
  <Button
    type="button"
    variant="outline"
    size="sm"
    className={`h-9 rounded-lg px-2.5 text-slate-600 hover:text-slate-950 ${
      active ? "border-primary/30 bg-primary/10 text-primary" : "bg-white"
    }`}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    title={title}
  >
    {children}
  </Button>
);

const ToolbarGroup = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5">
    {children}
  </div>
);

const RichTextEditor = forwardRef<
  RichTextEditorHandle,
  {
    value: string;
    onChange: (nextValue: string) => void;
    placeholder?: string;
  }
>(({ value, onChange, placeholder = "Start writing your article…" }, ref) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<Range | null>(null);
  const renderedValue = useMemo(
    () => (isHtmlBlogContent(value) ? value : renderBlogMarkdown(value)),
    [value],
  );

  const saveSelection = () => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return;
    selectionRef.current = range.cloneRange();
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    const range = selectionRef.current;
    if (!selection || !range) return;

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const emitChange = () => {
    const nextValue = normalizeEditorValue(editorRef.current?.innerHTML ?? "");
    onChange(nextValue);
    saveSelection();
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const exec = (command: string, commandValue?: string) => {
    focusEditor();
    restoreSelection();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const formatBlock = (tagName: BlockTag) => {
    focusEditor();
    restoreSelection();
    document.execCommand("formatBlock", false, `<${tagName}>`);
    emitChange();
  };

  const insertLink = (label: string, url: string) => {
    focusEditor();
    restoreSelection();
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      document.execCommand("createLink", false, url);
    } else {
      document.execCommand("insertHTML", false, `<a href="${url}">${label}</a>`);
    }
    emitChange();
  };

  const unlink = () => exec("unlink");

  const insertInlineCode = () => {
    focusEditor();
    restoreSelection();
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "code";
    document.execCommand("insertHTML", false, `<code>${escapeHtml(selectedText)}</code>`);
    emitChange();
  };

  const insertImage = (url: string, alt = "") => {
    focusEditor();
    restoreSelection();
    const safeAlt = alt.replace(/"/g, "&quot;");
    const caption = safeAlt ? `<figcaption>${safeAlt}</figcaption>` : "";
    document.execCommand(
      "insertHTML",
      false,
      `<figure><img src="${url}" alt="${safeAlt}" loading="lazy" />${caption}</figure><p></p>`,
    );
    emitChange();
  };

  const promptForImage = () => {
    const url = window.prompt("Enter image URL");
    if (!url) return;
    const alt = window.prompt("Enter image alt text", "") || "";
    insertImage(url, alt);
  };

  const insertHorizontalRule = () => {
    focusEditor();
    restoreSelection();
    document.execCommand("insertHTML", false, "<hr><p></p>");
    emitChange();
  };

  const insertTable = () => {
    const rowCount = Math.min(8, Math.max(1, Number(window.prompt("Rows", "3")) || 3));
    const columnCount = Math.min(6, Math.max(1, Number(window.prompt("Columns", "3")) || 3));
    const headerCells = Array.from({ length: columnCount }, (_, index) => `<th>Heading ${index + 1}</th>`).join("");
    const bodyRows = Array.from({ length: rowCount }, () => {
      const cells = Array.from({ length: columnCount }, () => "<td>Text</td>").join("");
      return `<tr>${cells}</tr>`;
    }).join("");

    focusEditor();
    restoreSelection();
    document.execCommand(
      "insertHTML",
      false,
      `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><p></p>`,
    );
    emitChange();
  };

  const promptForLink = () => {
    const url = window.prompt("Enter a URL for this link", "/mobile-shop-pos-system");
    if (!url) return;

    const selection = window.getSelection();
    const label =
      selection && selection.toString().trim()
        ? selection.toString().trim()
        : window.prompt("Enter link text", "Related page") || "Related page";

    insertLink(label, url);
  };

  useImperativeHandle(ref, () => ({
    focus: focusEditor,
    insertLink,
    insertImage,
  }));

  useEffect(() => {
    if (!editorRef.current) return;
    if (normalizeEditorValue(editorRef.current.innerHTML) === normalizeEditorValue(renderedValue)) return;
    editorRef.current.innerHTML = renderedValue || "";
  }, [renderedValue]);

  const isEmpty = normalizeEditorValue(renderedValue) === "";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-2 border-b border-slate-200 bg-slate-50 px-3 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="h-10 min-w-44 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-primary"
            defaultValue="p"
            onChange={(event) => formatBlock(event.target.value as BlockTag)}
            onMouseDown={(event) => event.stopPropagation()}
            title="Text style"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
            <option value="blockquote">Quote</option>
            <option value="pre">Code block</option>
          </select>

          <ToolbarGroup>
            <ToolbarButton onClick={() => formatBlock("p")} title="Paragraph">
              <Pilcrow size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatBlock("h1")} title="Heading 1">
              <Heading1 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatBlock("h2")} title="Heading 2">
              <Heading2 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatBlock("h3")} title="Heading 3">
              <Heading3 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatBlock("h4")} title="Heading 4">
              <Heading4 size={15} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarButton onClick={() => exec("bold")} title="Bold">
              <Bold size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("italic")} title="Italic">
              <Italic size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("underline")} title="Underline">
              <Underline size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("strikeThrough")} title="Strikethrough">
              <Strikethrough size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={insertInlineCode} title="Inline code">
              <Code2 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("subscript")} title="Subscript">
              <Subscript size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("superscript")} title="Superscript">
              <Superscript size={15} />
            </ToolbarButton>
          </ToolbarGroup>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ToolbarGroup>
            <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Bullet list">
              <List size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("insertOrderedList")} title="Numbered list">
              <ListOrdered size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("outdent")} title="Outdent">
              <Outdent size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("indent")} title="Indent">
              <Indent size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatBlock("blockquote")} title="Quote">
              <Quote size={15} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarButton onClick={() => exec("justifyLeft")} title="Align left">
              <AlignLeft size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("justifyCenter")} title="Align center">
              <AlignCenter size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("justifyRight")} title="Align right">
              <AlignRight size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("justifyFull")} title="Justify">
              <AlignJustify size={15} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarButton onClick={promptForLink} title="Insert link">
              <Link2 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={unlink} title="Remove link">
              <Unlink size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={promptForImage} title="Insert image by URL">
              <ImagePlus size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={insertTable} title="Insert table">
              <Table2 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={insertHorizontalRule} title="Horizontal line">
              <Minus size={15} />
            </ToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <label
              className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600"
              title="Text color"
              onMouseDown={(event) => event.stopPropagation()}
            >
              Text
              <input
                type="color"
                className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
                defaultValue="#111827"
                onChange={(event) => exec("foreColor", event.target.value)}
              />
            </label>
            <label
              className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600"
              title="Highlight color"
              onMouseDown={(event) => event.stopPropagation()}
            >
              Highlight
              <input
                type="color"
                className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
                defaultValue="#fff3bf"
                onChange={(event) => exec("hiliteColor", event.target.value)}
              />
            </label>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarButton onClick={() => exec("removeFormat")} title="Clear formatting">
              <Eraser size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("undo")} title="Undo">
              <Undo2 size={15} />
            </ToolbarButton>
            <ToolbarButton onClick={() => exec("redo")} title="Redo">
              <Redo2 size={15} />
            </ToolbarButton>
          </ToolbarGroup>
        </div>
      </div>

      <div className="relative">
        {isEmpty ? (
          <div className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground">
            {placeholder}
          </div>
        ) : null}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="min-h-[520px] px-5 py-5 text-base leading-7 text-foreground outline-none
            [&_a]:text-primary [&_a]:underline
            [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:bg-primary/5 [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_blockquote]:italic
            [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm
            [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-muted-foreground
            [&_figure]:my-6
            [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold
            [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold
            [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold
            [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-lg [&_h4]:font-semibold
            [&_h5]:mb-2 [&_h5]:mt-4 [&_h5]:text-base [&_h5]:font-semibold
            [&_h6]:mb-2 [&_h6]:mt-4 [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:uppercase [&_h6]:tracking-wide
            [&_hr]:my-7 [&_hr]:border-slate-200
            [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl
            [&_li]:ml-6 [&_ol]:my-4 [&_ol]:list-decimal [&_p]:mb-4
            [&_pre]:my-5 [&_pre]:overflow-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:text-slate-100
            [&_strong]:font-semibold
            [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:p-2 [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:p-2 [&_th]:text-left
            [&_ul]:my-4 [&_ul]:list-disc"
          onInput={emitChange}
          onBlur={emitChange}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
        />
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
