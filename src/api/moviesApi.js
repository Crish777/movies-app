import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://api.themoviedb.org/3", prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`);
    return headers;
  }}),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `/genre/movie/list?language=es`
    }),
    getMovies: builder.query({
      query: (page=1) => `/trending/all/day?page=${page}`
    }),
    getMovieById: builder.query({
      query: (movieid) => `/movie/${movieid}`
    }),
    getMovieByTitle: builder.query({
      query: (title) => `search/movie?query=${title}`
    }),
    getMoviesByFilter: builder.query({
      query: ({genreSelected, byVotes, dateString}) => {

        let joinUrl = `discover/movie?language=en-US&page=1`;
        if (genreSelected) {
          joinUrl += `&with_genres=${genreSelected}`;
        }
        if (byVotes) {
          joinUrl += `&sort_by=vote_average.desc`;
        }
        if (dateString) {
          joinUrl += `&primary_release_date.gte=${dateString}`;
        }

        return joinUrl;
      },
      keepUnusedDataFor: 0
    }),
  })
})


export const { useGetMoviesQuery, useGetMovieByIdQuery, useLazyGetMovieByTitleQuery, useLazyGetMoviesByFilterQuery, useGetGenresQuery } = moviesApi;