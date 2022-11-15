/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import { ThemeProvider } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  RootContainer,
  SingleResultContainer
} from '../PeopleResults/PeopleResults.Style';

import { searchTheme } from '../../../pages/SearchResults/SearchCards.Style';
import {
  PostInfo,
  PostStatistics,
  StyledLogo,
  Username,
  StyledSpan,
  UpVotes,
  Comments
} from '../CommentsResults/CommentsResults.Style';
import CommunitiesResults from '../CommunitiesResults/CommunitiesResults';
import PeopleResults from '../PeopleResults/PeopleResults';
import { divideBigNumber } from '../../../utilities/Helpers';
import retrieveResults from '../../../services/requests/Search';
import CreateCommunity from '../../CreateCommunity/CreateCommunity';

import {
  ResultsContainer,
  SideCardsContainer,
  PostTitle,
  SearchResults,
  Flair,
  ImageContainer
} from './PostsResults.Style';

/**
 * This Component for the showing the posts related to the key of the searching.
 *
 */
function PostsResults() {
  // states
  const searchKey = 'test'; // for testing
  const [result, setResult] = useState([]);
  const [time, setTime] = useState('');
  const [sort, setSort] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  // Fetching the results by calling the fetch service
  useEffect(() => {
    const fetchResults = async () => {
      const results = await retrieveResults({
        key: searchKey,
        searchingCategory: 'posts',
        sort: sort === '' ? null : sort,
        time: time === '' ? null : time
      });
      setResult(results);
      setIsFinished(true);
    };
    fetchResults();
  }, [time, sort]);

  const handleSorting = (event) => {
    setSort(event.target.value);
  };
  const handleTiming = (event) => {
    setTime(event.target.value);
  };

  return (
    <ThemeProvider theme={searchTheme}>
      {/* Sorting the posts */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        {/* Sorting the posts */}
        <Box
          className="sort-relevance"
          sx={{
            width: '11rem',
            marginTop: '2rem',
            '& > div label': {
              fontSize: '14px',
              color: 'black',
              fontWeight: '500',
              verticalAlign: 'top'
            }
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="select-sort">Sort</InputLabel>
            <Select
              labelId="select-sort"
              id="demo-simple-select"
              value={sort}
              label="Sort"
              onChange={handleSorting}
              sx={{
                borderRadius: '50px',
                '& svg': {
                  width: '2rem',
                  height: '2rem'
                }
              }}
            >
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={0}
              >
                Relevance
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={1}
              >
                Hot
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={2}
              >
                Top
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={3}
              >
                New
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={4}
              >
                Most Comments
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sorting the posts relative to the time */}
        <Box
          className="sort-time"
          sx={{
            width: '11rem',
            marginTop: '2rem',
            marginLeft: '2rem',
            '& > div label': {
              fontSize: '14px',
              color: 'black',
              fontWeight: '500',
              verticalAlign: 'top'
            }
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="select-time-label">Time</InputLabel>
            <Select
              labelId="select-time-label"
              id="select-time"
              value={time}
              label="Time"
              onChange={handleTiming}
              sx={{
                borderRadius: '50px',
                '& svg': {
                  width: '2rem',
                  height: '2rem'
                }
              }}
            >
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={0}
              >
                All Time
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={1}
              >
                Past Year
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={2}
              >
                Past Month
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={3}
              >
                Past Week
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={4}
              >
                Past 24 Hours
              </MenuItem>
              <MenuItem
                sx={{ fontSize: '13px' }}
                value={5}
              >
                Past Hour
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Posts results  */}
      <RootContainer
        sx={{
          border: 'none',
          justifyContent: 'space-between'
        }}
      >
        <ResultsContainer
          sx={{
            backgroundColor: 'white',
            marginRight: '1.5rem',
            flexDirection: 'column',
            borderRadius: '5px',
            border: '.5px solid #ccc'
          }}
        >
          {result.length === 0 && isFinished ? (
            <h3>No data found.</h3>
          ) : (
            result.map((item, index) => (
              //  result container
              <SingleResultContainer
                key={`people-result-${index}`}
                sx={{
                  flexDirection: 'column',
                  ':hover': {
                    border: '.5px solid black'
                    // borderRadius: '5px'
                  }
                }}
              >
                {/* Post info ( posted by, time, ..) */}
                <PostInfo>
                  <StyledLogo>
                    <img
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      src="https://styles.redditmedia.com/t5_2rr0e/styles/communityIcon_ylhgbe8ngx481.jpg?width=256&s=1bcbaeab5d6b9e79ad2b820ce7bf7b86b1cf3af5"
                      alt="community logo"
                    />
                  </StyledLogo>
                  <Username>{`r/${item.subreddit_name}`}</Username>
                  <StyledSpan>
                    <span>
                      Posted by
                      <Username> {` u/${item.posted_by}`}</Username>
                      {`${item.posted_since} ago`}
                    </span>
                  </StyledSpan>
                </PostInfo>

                {/* Post search result */}
                <SearchResults>
                  <div>
                    <PostTitle variant="h3">{`${item.post_title}`}</PostTitle>
                    {item.post_flairs.length > 0
                      ? item.post_flairs.map((flair) => <Flair>{flair}</Flair>)
                      : null}
                  </div>
                  {item.post_img && (
                    <ImageContainer>
                      <img
                        src="https://i.redd.it/5ldbdyaihku91.jpg"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </ImageContainer>
                  )}
                </SearchResults>

                {/* Number of comments and upvotes  */}
                <PostStatistics>
                  <UpVotes>
                    {divideBigNumber(item.upvotes_count)} upvotes
                  </UpVotes>
                  <Comments>
                    {divideBigNumber(item.comments_count)} Comments
                  </Comments>
                </PostStatistics>
              </SingleResultContainer>
            ))
          )}
        </ResultsContainer>

        <SideCardsContainer>
          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '5px'
            }}
          >
            <CommunitiesResults isSideBarCard={true} />
          </div>

          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '5px'
            }}
          >
            <PeopleResults isSideBarCard={true} />
          </div>

          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '5px'
            }}
          >
            <CreateCommunity />
          </div>
        </SideCardsContainer>
      </RootContainer>
    </ThemeProvider>
  );
}

export default memo(PostsResults);
