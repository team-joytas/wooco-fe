import { Cascader } from 'antd'
import getData from '@/app/getData'
import { DefaultOptionType } from 'antd/es/cascader'

interface CascaderProps {
  placeholder: string
  setSelectedRegion: (value: string) => void
}

export default function RegionCascader({
  placeholder,
  setSelectedRegion,
}: CascaderProps) {
  const { data } = getData()

  const onChange = (value: (string | number | null)[]) => {
    if (value) setSelectedRegion(value[1] as string)
  }

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    )

  return (
    <Cascader
      options={data}
      placeholder={placeholder}
      onChange={onChange}
      size='large'
      showSearch={{ filter }}
      style={{
        width: '100%',
      }}
      expandTrigger='hover'
    />
  )
}
