import React from 'react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';

interface ISortProps extends React.HTMLAttributes<HTMLDivElement> {
  sortDirection?: 'asc' | 'desc';
}

const Sort = ({ sortDirection, ...props }: ISortProps) => {
  return (
    <div className="flex items-center cursor-pointer" {...props}>
        <div className={`rotate-180 ${sortDirection === 'asc' ? 'text-white' : 'text-content-3'}`}>
            <ArrowDownIcon width={10} height={10} />
        </div>
        <div className={sortDirection === 'desc' ? 'text-white' : 'text-content-3'}>
            <ArrowDownIcon width={10} height={10} />
        </div>
    </div>
  )
}

export default Sort