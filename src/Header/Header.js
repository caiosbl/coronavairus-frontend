import React from 'react';


class Header extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div style={styles.container}>
        <div style={styles.title}>Coronavairus</div>
        <div style={styles.description}>Dados em tempo real sobre o Coronavírus</div>
      </div>);

  }
}
export default Header;


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  title: {
    fontFamily: "Marcellus SC, serif",
    fontSize: "10vmin",
    color: "red",
    textShadow: "10px 2px 7vmin red",
  },
  description: {
    lineHeight: 0,
    fontFamily: "Oswald, sans-serif",
    fontSize: "3vmin",
    color: "red"
  }

}
