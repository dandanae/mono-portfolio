'use client';
import { overlay } from 'overlay-kit';
import React from 'react';
import { PlotInfo, PlotMetadata } from '@/plots/types';
import { IconButton, Modal, Tooltip } from '@repo/ui';

const ScenarioInfo = ({ infos, metadata }: { infos?: PlotInfo[]; metadata: PlotMetadata }) => {
  return (
    <div className="tems-center flex justify-center gap-2">
      {metadata?.href && (
        <Tooltip key={metadata.href} label="원문 보러 가기">
          <IconButton
            icon="link"
            variant="fill"
            onClick={() => {
              window.open(metadata.href, '_blank');
            }}
          />
        </Tooltip>
      )}
      {infos &&
        infos.length > 0 &&
        infos.map(i => (
          <Tooltip key={i.key} label={i.key}>
            <IconButton
              icon={i.icon}
              variant="fill"
              onClick={() => {
                overlay.open(({ isOpen, close }) => (
                  <Modal key={i.key} title={i.key} open={isOpen} close={close} confirmText="확인">
                    {i.value}
                  </Modal>
                ));
              }}
            />
          </Tooltip>
        ))}
    </div>
  );
};

export default ScenarioInfo;
