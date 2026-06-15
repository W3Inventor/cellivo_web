import { useId, useRef, useState } from "react";
import { ImageIcon, Loader2, Link2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadAdminImage } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  folder: string;
  placeholder?: string;
  previewAlt?: string;
  className?: string;
  previewClassName?: string;
  onUploadComplete?: (url: string) => void;
}

const ImageUploadField = ({
  value,
  onChange,
  folder,
  placeholder = "Paste an image URL or upload a file",
  previewAlt = "Uploaded preview",
  className,
  previewClassName,
  onUploadComplete,
}: ImageUploadFieldProps) => {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const response = await uploadAdminImage(file, folder);
      onChange(response.url);
      onUploadComplete?.(response.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload the image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Link2
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            id={inputId}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="pl-9"
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => void handleUpload(event.target.files?.[0])}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Upload size={16} className="mr-2" />}
          {uploading ? "Uploading…" : "Upload Image"}
        </Button>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      <div
        className={cn(
          "flex min-h-32 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5",
          previewClassName,
        )}
      >
        {value ? (
          <img src={value} alt={previewAlt} className="max-h-32 w-auto max-w-full rounded-xl object-contain" />
        ) : (
          <div className="text-center text-sm text-slate-500">
            <ImageIcon size={18} className="mx-auto mb-2 text-slate-400" />
            Upload an image or paste a hosted image URL.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;
