import { SyntheticEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Action, SkillList } from '../components/Skills'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initSearchType = searchParams.get('searchType') || 'skills'

  const [searchType, setSearchType] = useState(initSearchType)
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const onChangeSearchType = (value: string) => {
    setSearchType(value as SearchType)
    setSearchParams({
      searchType: value,
    })
  }

  const onChangeSearchKeyword = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    if (!e?.target) return
    const { value } = e.target as HTMLInputElement
    setSearchKeyword(value)
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Action
        searchType={searchType}
        searchKeyword={searchKeyword}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeSearchType={onChangeSearchType}
      />

      <SkillList keyword={searchKeyword} />
    </div>
  )
}

export default SearchPage
