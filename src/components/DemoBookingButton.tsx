import { lazy, Suspense, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { isCalBookingConfigured } from "@/lib/cal";
import { Button, type ButtonProps } from "@/components/ui/button";

const DemoBookingDialog = lazy(() => import("@/components/DemoBookingDialog"));

interface DemoBookingButtonProps extends Omit<ButtonProps, "children"> {
  children: ReactNode;
  fallbackTo?: string;
  dialogTitle?: string;
  dialogDescription?: string;
}

const DemoBookingButton = ({
  children,
  fallbackTo = "/contact",
  dialogTitle = "Book your live demo",
  dialogDescription = "Choose a time that works for you and we will walk you through Cellivo live.",
  className,
  variant,
  size,
  ...buttonProps
}: DemoBookingButtonProps) => {
  const [open, setOpen] = useState(false);

  if (!isCalBookingConfigured) {
    return (
      <Button asChild variant={variant} size={size} className={className} {...buttonProps}>
        <Link to={fallbackTo}>{children}</Link>
      </Button>
    );
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)} {...buttonProps}>
        {children}
      </Button>
      {open ? (
        <Suspense fallback={null}>
          <DemoBookingDialog
            dialogDescription={dialogDescription}
            dialogTitle={dialogTitle}
            fallbackTo={fallbackTo}
            onOpenChange={setOpen}
            open={open}
          />
        </Suspense>
      ) : null}
    </>
  );
};

export default DemoBookingButton;
