const SEARCH_RESULT = 'searchResult';

const SearchUtil = {
  getResult: () => {
    var data = sessionStorage.getItem(SEARCH_RESULT);
    if (data) {
      sessionStorage.removeItem(SEARCH_RESULT);
      return JSON.parse(data);
    }
    return null;
  },
  setResult: (location, type) => {
    sessionStorage.setItem(
      SEARCH_RESULT,
      JSON.stringify({
        type: type,
        location: location,
      }),
    );
  },
};

export default SearchUtil;
