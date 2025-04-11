import SearchNucleus from './components/SearchNucleus'

const NucleusList = () => {
  return (
    <div className='px-4'>
      <div>
        <h2 className="text-xl font-medium text-black mt-8">Search Existing</h2>
        <p className="text-gray-600 text-sm">
          Search for existing spatial templates by title or description
        </p>

        <SearchNucleus />
      </div>
    </div>
  )
}

export default NucleusList