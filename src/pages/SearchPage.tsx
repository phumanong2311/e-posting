import { SyntheticEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  Action,
  UserSearch,
  CompanySearch,
  JobSearch,
  RequestSearch,
} from '../components/Search'
import { SearchType } from '../types'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initSearchType = searchParams.get('searchType') || SearchType.Jobs

  const [searchType, setSearchType] = useState<SearchType>(
    initSearchType as SearchType
  )
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

  const renderResultPage = () => {
    switch (searchType) {
      case SearchType.Jobs:
        return <JobSearch keyword={searchKeyword} />
      case SearchType.Companies:
        return <CompanySearch keyword={searchKeyword} />
      case SearchType.Users:
        return <UserSearch keyword={searchKeyword} />
      case SearchType.Requests:
        return <RequestSearch keyword={searchKeyword} />
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Action
        searchType={searchType}
        searchKeyword={searchKeyword}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeSearchType={onChangeSearchType}
      />

      {renderResultPage()}
    </div>
  )
}

export default SearchPage
