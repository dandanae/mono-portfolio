import React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import Button from "./Button";

const AlertDialog = ({
  title,
  description,
  actionLabel,
  onAction,
  actionLoading,
  children,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  actionLoading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {/* 다이얼로그 트리거 */}
        {children}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="ui:fixed ui:inset-0 ui:bg-black/50 ui:z-999" />
        <AlertDialogPrimitive.Content className="mona10x12 ui:fixed ui:top-1/2 ui:left-1/2 ui:-translate-x-1/2 ui:-translate-y-1/2 ui:w-full ui:max-w-md ui:rounded-lg ui:bg-white ui:px-6 ui:py-8 ui:shadow-lg ui:z-999">
          {/* 제목 */}
          <AlertDialogPrimitive.Title className="ui:text-2xl ui:font-bold ui:mb-4">
            {title}
          </AlertDialogPrimitive.Title>
          {/* 경고 메시지*/}
          <AlertDialogPrimitive.Description className="ui:text-slate-500 ui:mb-8">
            {description}
          </AlertDialogPrimitive.Description>
          {/* 버튼 영역 */}
          <div className="ui:flex ui:justify-end ui:gap-2">
            {/* 취소 버튼 */}
            <AlertDialogPrimitive.Cancel>
              <Button color="primary" fill="weak" disabled={actionLoading}>
                취소
              </Button>
            </AlertDialogPrimitive.Cancel>
            {/* 확인 버튼 */}
            <AlertDialogPrimitive.Action asChild>
              <Button color="danger" onClick={onAction} loading={actionLoading}>
                {actionLabel}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default AlertDialog;
