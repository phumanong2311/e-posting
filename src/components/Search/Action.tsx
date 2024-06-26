import { Select, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { SyntheticEvent } from 'react'
import { SearchType } from '../../types'

interface ActionProps {
  searchType: SearchType
  searchKeyword: string
  onChangeSearchKeyword: (e: SyntheticEvent<HTMLInputElement, Event>) => void
  onChangeSearchType: (value: string) => void
}

export const Action = ({
  searchType,
  searchKeyword,
  onChangeSearchKeyword,
  onChangeSearchType,
}: ActionProps) => {
  return (
    <div className="max-w-[400px] mt-10 flex items-center">
      <TextInput
        leftSection={<IconSearch />}
        radius={100}
        classNames={{
          input: 'rounded-tr-none rounded-br-none border-r-0',
        }}
        className="w-[70%]"
        name="keyword"
        value={searchKeyword}
        onChange={(e) => onChangeSearchKeyword(e)}
      />
      <Select
        placeholder="Filters"
        radius={100}
        classNames={{
          input: 'rounded-tl-none rounded-bl-none',
        }}
        className="mt-0 w-[30%]"
        data={[
          { value: SearchType.Jobs, label: 'Jobs' },
          { value: SearchType.Companies, label: 'Companies' },
          { value: SearchType.Users, label: 'Users' },
          { value: SearchType.Requests, label: 'Requests' },
        ]}
        value={searchType}
        onChange={(value) => onChangeSearchType(value!)}
      />
    </div>
  )
}
