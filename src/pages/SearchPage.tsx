import { SyntheticEvent, useState } from 'react'
import { Action } from '../components/SearchComponent'
import JobSearch from '../components/SearchComponent/JobSearch'
import { SearchType } from '../types'
import CompanySearch from '../components/SearchComponent/CompanySearch'

const SearchPage = () => {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Jobs)
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const onChangeSearchType = (value: string) => {
    setSearchType(value as SearchType)
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
