<form className='searchingBar' onSubmit={handleSubmit}>
  <div className='searchingBox'>
    <input 
      type="text" 
      placeholder="Type city names..." 
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onClick={() => setDisplayHistory(true)}
      />
    {displayHistory && 
      <ul className='searchHistory'>
        {filteredHistory.map((keyword, index) => (
          <li key={index} onClick={(e) => {
            setSearchValue(keyword)
            handleSubmit(e)
          }}
          >
            {keyword}
          </li>
        ))}
      </ul>
    }
  </div>
       
    <button
      type='submit'
      onClick={(e) => handleSubmit(e)}>
        Search
    </button>
</form>