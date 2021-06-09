import React, { useEffect } from 'react';
import useSuggestions from '../../state/suggestion/hooks/useSuggestions';
import { getRelativeTimeFromDate,formatDate } from '../../utils/date';
import ChatIcon from '../../assets/chat-icon.svg';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import {
  Container,
  Heading,
  HeadingContainerSpaceBetween,
  SuggestionFeed,
  SuggestionFeedIcon,
  SuggestionFeedItem,
  SuggestionForm,
  SuggeestionNotFound,
} from './components';

const Home = () => {
  const [suggestion, getSuggestions, submitSuggestion, isLoading, error] = useSuggestions();

  useEffect(() => {
    getSuggestions();
  }, []);
  
  const handleSubmit = async (values,actions) => {

    // Submit suggestion
    await submitSuggestion(values);
    // reset form
    actions.resetForm();
  };

  const hasSuggestions = suggestion?.results?.length > 0;

  return (
    <>
      <Spinner show={isLoading} />
      <Container>
        <div className="section">
          <Heading>Make a Suggestion</Heading>
          <SuggestionForm onSubmit={handleSubmit} />
        </div>
        <HeadingContainerSpaceBetween>
          <Heading>Suggestion Feed</Heading>
          <Button type="submit" onClick={getSuggestions}>
            Refresh
          </Button>
        </HeadingContainerSpaceBetween>
        {hasSuggestions ? 
        (<SuggestionFeed>
          {suggestion?.results?.map((s) =>
           (<SuggestionFeedItem key = {s.id} data-date={getRelativeTimeFromDate(s.createdAt)}>
            <SuggestionFeedIcon src={ChatIcon} alt="Chat Icon" />
            <section>
              <div className="title">{s.title}</div>
              <div className="description">{s.description}</div>
              <div className="footer">
                Suggested by <span className="bold">{s.user.name}</span> on {formatDate(s.createdAt)}
              </div>
            </section>
          </SuggestionFeedItem>)
          )}
          
        </SuggestionFeed>) : 
        (<SuggeestionNotFound> No suggestions found. </SuggeestionNotFound>)
        }
      </Container>
    </>
  );
};

export default Home;
