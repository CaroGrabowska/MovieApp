// API CONFIG
import { http, paramDefault } from '../../api/request';

// TYPES
import * as mutation from '../types/mutation';
import apiEndpoints from '../../api/endpoints';

// =========================
// STATE
// =========================

const state = {
  movies: [],
  filter: '',
  searchTerm: '',
  page: {
    total: null,
    current: 0
  },
  preview: {
    id: null
  },
  movie_details: [],
  sort: {
    orderBy: '',
    orderDirection: ''
  }
};

// =========================
// GETTERS
// =========================

const getters = {
  getAvailableMovieList: state => {
    return state.movies.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        popularity: movie.popularity,
        vote_average: movie.vote_average
      };
    });
  },
  getAvailablePageList: state => state.page.total,
  getCurrentPage: state => state.page.current,
  getAvailableFilter: state => state.filter,
  getDetailsMovie: state => {
    return {
      id: state.movie_details.id,
      title: state.movie_details.title,
      genres: state.movie_details.genres
    }
  }
}

// =========================
// MUTATIONS
// =========================

const mutations = {
  [mutation.SET_AVAILABLE_LIST] (state, movies) {
    state.movies = movies;
  },

  [mutation.SET_FILTER_TERM] (state, filterStatus) {
    state.filter = filterStatus;
  },

  [mutation.SET_PAGES] (state, { total, current }) {
    state.page.total = total;
    state.page.current = current;
  },

  [mutation.SET_SEARCH_TERM] (state, searchTerm) {
    state.searchTerm = searchTerm;
  },

  [mutation.SET_PREVIEW_ITEM] (state, id) {
    state.preview.id = id;
  },

  [mutation.SET_PREVIEW_ITEM_DETAILS] (state, details) {
    state.movie_details = details;
  },

  [mutation.SET_SORT_DETAILS] (state, data) {
    state.sort = data;
  },

  [mutation.SET_SORT_LIST] (state, moviesSort) {
    state.movies = moviesSort;
  }
}

// =========================
// ACTIONS
// =========================

const actions = {
  displayFullList ({ commit, state }, pageToDisplay = 1) {
    const request = http(apiEndpoints.discover);

    request
      .get('', { params: { ...paramDefault, page: pageToDisplay } })
      .then(response => {
        commit(mutation.SET_PAGES, {
          total: response.data.total_pages,
          current: response.data.page
        });
        commit(mutation.SET_AVAILABLE_LIST, response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async displayFilteredList ({ commit, state }, pageToDisplay = 1) {
    const instance = http(apiEndpoints.default);
    const response = await instance.get(`/${state.filter}`, {
      params: { ...paramDefault, page: pageToDisplay }
    });

    commit(mutation.SET_PAGES, {
      total: response.data.total_pages,
      current: response.data.page
    });
    commit(mutation.SET_AVAILABLE_LIST, response.data.results);
  },

  async displaySearchList ({ commit, state }, pageToDisplay = 1) {
    const instance = http(apiEndpoints.search);
    const response = await instance.get('', {
      params: { ...paramDefault, page: pageToDisplay, query: state.searchTerm }
    });

    commit(mutation.SET_PAGES, {
      total: response.data.total_pages,
      current: response.data.page
    });

    commit(mutation.SET_AVAILABLE_LIST, response.data.results);
  },

  displayPreviewItem: ({ commit, state }) => {
    const request = http(apiEndpoints.default);

    Promise.all([
      request.get(`${state.preview.id}`, { params: { ...paramDefault } }),
      request.get(`${state.preview.id}/credits`, { params: { ...paramDefault } })
    ])

      .then(response => {
        const obj = Object.assign({}, ...response.map(item => ({ ...item.data })))
        return obj;
      })
      .then(data => {
        commit(mutation.SET_PREVIEW_ITEM_DETAILS, data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  applaySorting ({ commit, state, dispatch }, data) {
    const movieSet = state.movies;

    switch (data.orderBy) {
      case 'votes':
        movieSet.sort((a, b) => {
          if (data.orderDirection === 'desc') {
            return ((a.vote_average === b.vote_average) ? 0 : ((a.vote_average < b.vote_average) ? 1 : -1));
          } else {
            return ((a.vote_average === b.vote_average) ? 0 : ((a.vote_average > b.vote_average) ? 1 : -1));
          }
        });
        break;
      case 'popularity':
        movieSet.sort((a, b) => {
          if (data.orderDirection === 'desc') {
            return ((a.popularity === b.popularity) ? 0 : ((a.popularity < b.popularity) ? 1 : -1));
          } else {
            return ((a.popularity === b.popularity) ? 0 : ((a.popularity > b.popularity) ? 1 : -1));
          }
        });
        break;
    }
    commit(mutation.SET_SORT_LIST, movieSet);
  },

  setFilter ({ commit, dispatch }, filterStatus) {
    commit(mutation.SET_FILTER_TERM, filterStatus);
    dispatch('displayFilteredList');
  },

  setOrderDirection ({ commit, dispatch }, data) {
    commit(mutation.SET_SORT_DETAILS, data);
    dispatch('applaySorting', { orderBy: state.sort.orderBy, orderDirection: state.sort.orderDirection });
  },

  setPageToDisplay ({ commit, dispatch, state }, displayPage) {
    const filterState = state.filter;
    const searchState = state.searchTerm;
    if (filterState) {
      dispatch('displayFilteredList', displayPage);
    } else if (searchState) {
      dispatch('displaySearchList', displayPage);
    } else {
      dispatch('displayFullList', displayPage);
    }
  },

  setSearch ({ commit, dispatch }, searchTerm) {
    commit(mutation.SET_SEARCH_TERM, searchTerm);
    dispatch('displaySearchList');
  },

  setPreviewItem ({ commit, dispatch }, id) {
    commit(mutation.SET_PREVIEW_ITEM, id);
    dispatch('displayPreviewItem');
  }
};

export default {
  /* namespaced: true, */
  state,
  getters,
  actions,
  mutations
};
