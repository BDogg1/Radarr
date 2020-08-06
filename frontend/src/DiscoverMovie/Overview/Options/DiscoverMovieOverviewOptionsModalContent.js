import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormLabel from 'Components/Form/FormLabel';
import Button from 'Components/Link/Button';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { inputTypes } from 'Helpers/Props';
import translate from 'Utilities/String/translate';

const posterSizeOptions = [
  { key: 'small', value: 'Small' },
  { key: 'medium', value: 'Medium' },
  { key: 'large', value: 'Large' }
];

class DiscoverMovieOverviewOptionsModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      size: props.size,
      showStudio: props.showStudio,
      includeRecommendations: props.includeRecommendations
    };
  }

  componentDidUpdate(prevProps) {
    const {
      size,
      showStudio,
      includeRecommendations
    } = this.props;

    const state = {};

    if (size !== prevProps.size) {
      state.size = size;
    }

    if (showStudio !== prevProps.showStudio) {
      state.showStudio = showStudio;
    }

    if (includeRecommendations !== prevProps.includeRecommendations) {
      state.includeRecommendations = includeRecommendations;
    }

    if (!_.isEmpty(state)) {
      this.setState(state);
    }
  }

  //
  // Listeners

  onChangeOverviewOption = ({ name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.onChangeOverviewOption({ [name]: value });
    });
  }

  onChangeOption = ({ name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.onChangeOption({
        [name]: value
      });
    });
  }

  //
  // Render

  render() {
    const {
      onModalClose
    } = this.props;

    const {
      size,
      showStudio,
      includeRecommendations
    } = this.state;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Overview Options
        </ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>Include Radarr Recommendations</FormLabel>
              <FormInputGroup
                type={inputTypes.CHECK}
                name="includeRecommendations"
                value={includeRecommendations}
                helpText="Include Radarr recommended movies in discovery view"
                onChange={this.onChangeOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Poster Size</FormLabel>

              <FormInputGroup
                type={inputTypes.SELECT}
                name="size"
                value={size}
                values={posterSizeOptions}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Show Studio</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="showStudio"
                value={showStudio}
                onChange={this.onChangeOverviewOption}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            onPress={onModalClose}
          >
            {translate('Close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

DiscoverMovieOverviewOptionsModalContent.propTypes = {
  size: PropTypes.string.isRequired,
  showStudio: PropTypes.bool.isRequired,
  includeRecommendations: PropTypes.bool.isRequired,
  onChangeOverviewOption: PropTypes.func.isRequired,
  onChangeOption: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default DiscoverMovieOverviewOptionsModalContent;
