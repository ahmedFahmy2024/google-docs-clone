import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon, Link2Icon, TrashIcon } from "lucide-react";
import { useEditorState } from "@tiptap/react";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, CirclePicker, SketchPicker } from "react-color";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      currentFont: ctx.editor?.getAttributes("textStyle").fontFamily,
    }),
  });

  const fonts = [
    { label: "Inter", value: "Inter" },
    { label: "Comic Sans MS, Comic Sans", value: "Comic Sans MS, Comic Sans" },
    { label: "Serif", value: "Serif" },
    { label: "Monospace", value: "Monospace" },
    { label: "Cursive", value: "Cursive" },
    { label: "Var(--title-font-family)", value: "var(--title-font-family)" },
    { label: "Exo 2", value: "Exo 2" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span className="truncate">
            {editorState?.currentFont || "Inter"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.value}
            className={cn(
              "flex text-sm h-7 p-1.5 cursor-pointer hover:bg-neutral-200/80 rounded-sm",
              editorState?.currentFont === font.value && "bg-neutral-200/80",
            )}
            style={{ fontFamily: font.value }}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      currentHeadingLevel: ctx.editor?.getAttributes("heading").level,
    }),
  });

  const headings = [
    { label: "Normal", value: 0, fontSize: "16px" },
    { label: "H1", value: 1, fontSize: "32px" },
    { label: "H2", value: 2, fontSize: "24px" },
    { label: "H3", value: 3, fontSize: "20px" },
    { label: "H4", value: 4, fontSize: "18px" },
    { label: "H5", value: 5, fontSize: "16px" },
    { label: "H6", value: 6, fontSize: "14px" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span className="truncate">
            {headings.find((h) => h.value === editorState?.currentHeadingLevel)
              ?.label || "Normal"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {headings.map(({ label, value, fontSize }) => (
          <DropdownMenuItem
            key={value}
            className={cn(
              "flex text-sm h-7 p-1.5 cursor-pointer hover:bg-neutral-200/80 rounded-sm",
              (value === 0 && !editorState?.currentHeadingLevel) ||
                editorState?.currentHeadingLevel === value
                ? "bg-neutral-200/80"
                : "",
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TextColorButton = () => {
  const { editor } = useEditorStore();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      currentTextColor: ctx.editor?.getAttributes("textStyle").color,
    }),
  });

  const currentColor = editorState?.currentTextColor || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 p-0 overflow-hidden text-sm gap-y-0.5"
        >
          <span className="text-xs">A</span>
          <div
            className="h-0.5 w-full"
            style={{ backgroundColor: currentColor }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker
          color={currentColor}
          onChange={onChange}
          disableAlpha={false}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      currentHighlightColor: ctx.editor?.getAttributes("highlight").color,
    }),
  });

  const currentColor = editorState?.currentHighlightColor || "#ffffff";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 p-0 overflow-hidden text-sm gap-y-0.5"
        >
          <span
            style={{ backgroundColor: currentColor }}
            className="text-xs px-0.5"
          >
            H
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker color={currentColor} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLink: ctx.editor?.isActive("link"),
    }),
  });

  const onChange = (href: string) => {
    if (editor?.isActive("link")) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    } else {
      editor?.chain().focus().setLink({ href }).run();
    }
    setValue("");
  };

  const onRemove = () => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-7 w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 p-0 overflow-hidden text-sm gap-y-0.5",
            editorState?.isLink && "bg-neutral-200/80",
          )}
        >
          <Link2Icon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
        {editorState?.isLink && (
          <Button onClick={onRemove}>
            <TrashIcon className="size-4" />
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
