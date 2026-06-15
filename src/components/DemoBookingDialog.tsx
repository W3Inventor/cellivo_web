import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Loader2 } from "lucide-react";

import { getCalEmbedUrl } from "@/lib/cal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DemoBookingDialogProps {
  dialogDescription: string;
  dialogTitle: string;
  fallbackTo: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const DemoBookingDialog = ({
  dialogDescription,
  dialogTitle,
  fallbackTo,
  onOpenChange,
  open,
}: DemoBookingDialogProps) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const embedUrl = useMemo(() => getCalEmbedUrl(), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="left-0 top-0 flex h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-white p-0 sm:left-[50%] sm:top-[50%] sm:h-auto sm:max-h-[90dvh] sm:w-[95vw] sm:max-w-6xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border">
        <DialogHeader className="border-b border-border px-4 py-4 pr-12 text-left sm:px-6 sm:py-5">
          <DialogTitle className="flex items-center gap-2 text-lg font-heading font-semibold leading-tight text-foreground sm:text-xl">
            <CalendarDays size={18} className="shrink-0 text-primary" />
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 min-h-0 bg-white">
          {!iframeLoaded && !loadError ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-3 px-6 py-10 text-center sm:min-h-[640px]">
              <Loader2 size={20} className="animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading live demo calendar...</p>
            </div>
          ) : null}

          {!loadError && embedUrl ? (
            <iframe
              key={embedUrl}
              src={embedUrl}
              title="Cellivo live demo booking calendar"
              className={`h-full min-h-[420px] w-full border-0 bg-white sm:min-h-[680px] ${iframeLoaded ? "block" : "invisible absolute inset-0"}`}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="camera; microphone; fullscreen; payment"
              onLoad={() => {
                setIframeLoaded(true);
              }}
              onError={() => {
                setLoadError(true);
              }}
            />
          ) : null}

          {loadError ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-3 px-6 py-10 text-center sm:min-h-[640px]">
              <p className="text-base font-medium text-foreground">
                We couldn't load the live demo calendar right now.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Please use the contact page and our team will help you schedule a demo manually.
              </p>
              <Button asChild className="mt-2">
                <Link to={fallbackTo}>Go to Contact</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoBookingDialog;
