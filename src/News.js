import React from 'react';
import 'moment/locale/pt-br';
import Moment from 'react-moment';

import { css } from "@emotion/core";

import Axios from 'axios';

import PropagateLoader from "react-spinners/PropagateLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



const ApiNews = Axios.create({
    baseURL: `https://coronavairus.herokuapp.com/`
});



class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastData: new Date(),
            news: [],
            scroll: true
        }

    }

    componentDidMount() {
        setInterval(() => this.setState({ lastData: new Date() }), 300000);
        setInterval(() => this.move(), 30);
        this.getData();
    }

    toNumber = (number) => Number(number.replace(",", ""));

    getData = () => {

        ApiNews.get("news/last", {
            params: {
                size: 20
            }
        }).then(res => {
            this.setState({ news: res.data.content });
        })
    }

    move = () => {

        if (this.refs.content && this.refs.scroller) {

            const scrollerWidth = this.refs.scroller.scrollLeft;

            if (scrollerWidth > this.refs.content.getBoundingClientRect().left) {
                this.refs.scroller.scrollLeft = 0
            }

            else {
                if (this.state.scroll) this.refs.scroller.scrollLeft += 1;
            }
        }


    }

    render() {

        const { news } = this.state;
        const loading = news.length === 0;


        return (

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
               
               {loading && <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 20}}><PropagateLoader
                    css={override}
                    size={20}
                    color={"red"}
                    loading={loading}

                /></div>}

                {!loading && <div style={{
                    display: "flex", flexDirection: "row", alignItems: "center", fontFamily: "Oswald, sans-serif",
                    justifyContent: "space-between", width: "100%", height: 40, border: "solid 1px red", borderRadius: 5
                }}>


                    <div style={{
                        display: "flex", flexDirection: "column", alignItems: "center", width: 200,
                        justifyContent: "center", height: 40, backgroundColor: "red",borderTopLeftRadius: 5,borderBottomLeftRadius:5
                    }}>Últimas Notícias</div>


                    <div ref={"scroller"}
                        style={{
                            display: "flex", flexDirection: "row", justifyContent: "space-between",
                            width: "100%", height: 40, overflow: "hidden"
                        }}>


                        {news.map((noticia, i) =>

                            <div key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} ref={"content"}>

                                <div style={{
                                    display: "flex", flexDirection: "column", marginRight: 10, color: "red", marginRight: 10,
                                    alignItems: "center", justifyContent: "center", fontSize: 15, width: "auto", whiteSpace: "nowrap"
                                }}>{noticia.source.toUpperCase()}:</div>

                                <div style={{
                                    display: "flex", flexDirection: "column", marginRight: 10, color: "white", marginRight: 10,
                                    alignItems: "center", justifyContent: "center", fontSize: 15, width: "auto", whiteSpace: "nowrap"
                                }}>
                                    {noticia.title.split(" - ")[0]}
                                </div>


                            </div>

                        )}

                    </div>


                </div>}

            </div>


        );


    }
}
export default News;

