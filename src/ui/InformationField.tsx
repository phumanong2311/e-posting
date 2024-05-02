import { isHTML } from "../utils"

interface IInformationFeild {
  label: string
  value: string | number
  className?: string
  actionComponent?: JSX.Element
}
export const InformationField = ({
  label,
  value,
  className = '',
  actionComponent = <></>,
}: IInformationFeild) => {
  const renderValue = () =>
  typeof(value) === "string" && isHTML(value) ? (
      <p
        className={`text-lg ml-3 ${className && className}`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></p>
    ) : (
      <p className={`text-lg ml-3 ${className && className}`}>{value}</p>
    )
  return (
    <div className="flex w-full justify-between items-center my-6">
      <div className="flex">
        <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
          {label}
        </p>
        {renderValue()}
      </div>
      <div className="flex gap-3">{actionComponent && actionComponent}</div>
    </div>
  )
}