import reducers from '../reducers';

describe('Reducers',() => {
    it('should create initial state',() => {
    let state;
    state = reducers(undefined, {});
    expect(state).toEqual({fetchWeather:{searchCriteria:'BY_CITY_NAME',weather:[],fetching:false}});
    })
});