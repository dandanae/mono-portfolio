import React from "react";

interface TableRowProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const TableRow = ({ left, right }: TableRowProps) => {
  return (
    <div className="ui:grid ui:grid-cols-[1fr_3fr]">
      <dt className="ui:flex ui:items-center ui:justify-end ui:bg-primary-50 ui:p-2 ui:text-right ui:text-sm ui:text-primary-950">
        {left}
      </dt>
      <dd className="ui:flex ui:flex-col ui:bg-white ui:p-2 ui:text-sm ui:leading-relaxed ui:whitespace-pre-line ui:text-gray-dark ui:font-sans">
        {right}
      </dd>
    </div>
  );
};

export default TableRow;
