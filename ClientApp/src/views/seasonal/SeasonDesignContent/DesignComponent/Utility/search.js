const searchQuery = {
    folderId: "0",
    designName: "",
    isText: false,
    isUserAdmin: false,
    createdBy: "string",
    filterSearchRequestDto: {
        folderId: 0,
        features: {},
        isAnd: false
    },
    IsRating: false,
    IsName: false,
    start: 0,
    end: 10,
    Range: {},
    Iswearhouse: false,
    designstate: '',
    Difference: 20 ,
    DesignTypeIdGroupId: "" //document.getElementById('collectionFabLibrary').value
}

const TextSearch = ({designName, isText, start, end, cb = null }) => {
  searchQuery.isText = isText
  searchQuery.designName = designName
  searchQuery.start = start ? start : 0 
  searchQuery.end = end ? end : 10
  searchQuery.Difference = (end && start) ? (end - start) : 10
  if (cb) {
      cb()
  } 
}

const getsearchQuery = () => {
    return searchQuery
}