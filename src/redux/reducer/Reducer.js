const initialState = {
    NewsInternational : [],
    NewsLocal : [],

    Longitude : '',
    Latitude : '',

    worldCase : {},
    myCase : {},
    CovidData : [],
    dataPerMonth : [],

    myCountry : '',
    myCity : '',
    myRegion : '',
    mySubregion : '',
    myPopulation : '',
    myCapital : '',
    myAlpha2Code : '',
    myAlpha3Code : '',

    webViewLink : '',

}

export default function reducer (state = initialState , action){
    switch (action.type){

        case 'setNewsInternational' : 
            return {
                ...state,
                NewsInternational : action.payload,
            }
        
        case 'setNewsLocal' : 
            return {
                ...state,
                NewsLocal : action.payload,
            }

        case 'setLongitude' : 
            return{
                ...state,
                Longitude : action.payload
            }

        case 'setLatitude' : 
            return{
                ...state,
                Latitude : action.payload
            }

        case 'setmyCountry' : 
            return{
                ...state,
                myCountry : action.payload
            }

        case 'setmyCity'  :
            return{
                ...state,
                myCity : action.payload
            }

        case 'setmyRegion'  :
            return{
                ...state,
                myRegion : action.payload
            }

        case 'setmySubregion'  :
            return{
                ...state,
                mySubregion : action.payload
            }

        case 'setmyPopulation'  :
            return{
                ...state,
                myPopulation : action.payload
            }

        case 'setmyCapital'  :
            return{
                ...state,
                myCapital : action.payload
            }

        case 'setmyAlpha2Code'  :
            return{
                ...state,
                myAlpha2Code : action.payload
            }

        case 'setmyAlpha3Code'  :
            return{
                ...state,
                myAlpha3Code : action.payload
            }

        case 'setCovidData' : 
            return{
                ...state,
                CovidData : action.payload
            }
        
        case 'setwebViewLink'  :
            return{
                ...state,
                webViewLink : action.payload
            }

        case 'setworldCase' : 
            return{
                ...state,
                worldCase : action.payload
            }

        case 'setmyCase' : 
            return{
                ...state, 
                myCase : action.payload
            }

        case 'setdataPerMonth' : 
            return{
                ...state,
                dataPerMonth : action.payload
            }

    }
}