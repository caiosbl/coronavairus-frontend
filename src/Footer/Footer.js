import React from 'react';
import 'moment/locale/pt-br';
import Moment from 'react-moment';



class Footer extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {

    const {lastData} = this.props;

      return (<footer style={{
        color: "red", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", width: "100%"
        , marginBottom: 20,
      }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center", width: "100%" }}>

          <div style={{ display: "flex", flexFlow: "row wrap", width: "100%", alignItems: "center", justifyContent: "space-around" }}>



            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 200, marginBottom: 20 }}>
              <div>Fontes:</div>
              <div>Johns Hopkins CSSE</div>
              <div>Ministério da Saúde</div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <span>Atualizado{" "}</span><Moment date={lastData} fromNow locale={"pt-br"} />
            </div>

            <div style={{ marginBottom: 20 }}>
              Desenvolvido por <a href="https://github.com/caiosbl" style={{ color: "red" }}>Caio Sanches</a> ©
          </div>

            <div style={{ marginBottom: 20 }}>
              Conheça a nossa <b><a href="/politica.html" target="_blank" style={{ color: "red" }}>Política de Privacidade</a></b>
            </div>

          </div>



        </div>



      </footer>
);


  }
}
export default Footer;
