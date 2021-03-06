function Header() {
  return (
    <header>
      <h1>JavaScript Frameworks</h1>
      <p className="subheading">
        Vote for <strong>your favorite</strong> one.
      </p>
    </header>
  );
}

function Candidate({ id, name, year, votes, img_url, handleClick }) {
  return (
    <article>
      <h3>{name}</h3>
      <div className="year">Released in {year}</div>
      <div>{votes} votes</div>
      <button id={id} onClick={handleClick}>
        +1 vote
      </button>
      <img alt={`${name} logo`} src={img_url} />
    </article>
  );
}

Candidate.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  img_url: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function CandidateList() {
  const [candidatesData, setCandidatesData] = React.useState([]);

  React.useEffect(() => {
    const fetchedCandidates = fetchData();
    setCandidatesData(sortByVotes(fetchedCandidates));

    // This empty function is just a placeholder for reference of useEffect's return value.
    return function cleanup() {};
  }, []);

  const sortByVotes = (data) => {
    return data.sort((a, b) => b.votes - a.votes);
  };
  const handleClick = (event) => {
    // This is the id property of the button in the Candidate components.
    const clickedButtonId = event.target.id;

    // This is done to prevent mutating the original data.
    // Using immutable data helps avoid hard to debug problems.
    const newCandidatesData = candidatesData.map((candidate) => {
      if (candidate.id === clickedButtonId) {
        return Object.assign({}, candidate, { votes: candidate.votes + 1 });
      } else {
        return candidate;
      }
    });

    setCandidatesData(sortByVotes(newCandidatesData));
  };

  return (
    <React.Fragment>
      <h2>Candidates</h2>
      <section>
        {candidatesData.map(({ id, name, year, votes, logo }) => {
          return (
            <Candidate
              key={id}
              id={id}
              name={name}
              year={year}
              votes={votes}
              img_url={logo}
              handleClick={handleClick}
            />
          );
        })}
      </section>
    </React.Fragment>
  );
}

function RatingApp() {
  return (
    <React.Fragment>
      <Header />
      <CandidateList />
    </React.Fragment>
  );
}

const domContainer = document.getElementById("react-app");
ReactDOM.render(<RatingApp />, domContainer);

function fetchData() {
  return [
    {
      id: "framework-1",
      name: "React",
      year: 2013,
      votes: 7,
      logo: "./images/react.png",
    },
    {
      id: "framework-2",
      name: "Vue",
      year: 2014,
      votes: 3,
      logo: "./images/vue.png",
    },
    {
      id: "framework-3",
      name: "Angular",
      year: 2010,
      votes: 5,
      logo: "./images/angular.png",
    },
  ];
}
