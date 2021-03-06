import React from 'react';
import styles             from '../styles';
import UserDetails        from './UserDetails';
import UserDetailsWrapper from './UserDetailsWrapper';
import { Link }               from 'react-router';
import MainContainer      from './MainContainer';
import Loading            from './Loading';

function StartOver(){
    return (
        <div className='col-sm-12' style={styles.space}>
            <Link to="/playerOne">
                <button type="button" className="btn btn-lg btn-danger">Start Over</button>
            </Link>
        </div>
    )
}
function Results(props){
    if (props.isLoading) {
        <Loading speed={ 800 } text="One Moment" />
    }
    if (props.scores[0] === props.scores[1]) {
        return (
            <MainContainer>
                <h1>It's a tie!</h1>
                <StartOver />
            </MainContainer>
        )
    }
    var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
    var losingIndex = winningIndex === 1 ? 0 : 1;
    return (
        <MainContainer>
            <h1>Results</h1>
            <div className="col-sm-8 col-sm-offset-2 " style={styles.transparentBg}>
                <UserDetailsWrapper header="Winner">
                    <UserDetails
                        score={props.scores[winningIndex]}
                        info={props.playersInfo[winningIndex]} />
                </UserDetailsWrapper>
                <UserDetailsWrapper header="Loser">
                    <UserDetails
                        score={props.scores[losingIndex]}
                        info={props.playersInfo[losingIndex]} />
                </UserDetailsWrapper>
            </div>
            <StartOver />
        </MainContainer>
    )
};

Results.propTypes = {
    isLoading   : React.PropTypes.bool.isRequired,
    playersInfo : React.PropTypes.array.isRequired,
    scores      : React.PropTypes.array.isRequired,
}
export default Results;
