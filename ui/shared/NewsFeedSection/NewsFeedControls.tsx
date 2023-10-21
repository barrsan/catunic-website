import { memo } from 'react';

import { Button } from '@/ui/shared/Button';
import CaretLeftIcon from '@/ui/svg/CaretLeftIcon.svg';
import CaretRightIcon from '@/ui/svg/CaretRightIcon.svg';

type Props = {
  onPrevClick: () => void;
  onNextClick: () => void;
};

function NewsFeedControls({ onPrevClick, onNextClick }: Props) {
  return (
    <div className="flex gap-x-4">
      <Button mode="button" aspectRatio="square" onClick={onPrevClick}>
        <CaretLeftIcon className="mx-auto h-6 w-6 fill-ds-grey-900" />
      </Button>
      <Button mode="button" aspectRatio="square" onClick={onNextClick}>
        <CaretRightIcon className="mx-auto h-6 w-6 fill-ds-grey-900" />
      </Button>
    </div>
  );
}

const MemoizedNewsFeedControls = memo(NewsFeedControls);

export { MemoizedNewsFeedControls as NewsFeedControls };
