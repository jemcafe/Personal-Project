import React from 'react';

import { scaleOrdinal } from 'd3-scale';
import { arc, pie } from 'd3-shape';

const width = 700;
const height = 400;

const radius = Math.min(width, height) / 2 ;

const color = scaleOrdinal()
    .range(['#cbf8d6','#ddecfd','#cbf8d6','#ddecfd','#cbf8d6','#cbf8d6','#ddecfd','#cbf8d6','#ddecfd','#cbf8d6']);

const dataArc = arc()
    .outerRadius(radius - 30)
    .innerRadius();

const labelArc = arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

const pieChart = pie()
    .sort(null)
    .value((d) => d.population);

function RatingsGraph ({ data }) {

    console.log( data );

    return (
        <svg width={ width } height={ height }>
            <g transform={`translate(${ width / 2 }, ${ height / 2 })`}>    { /* g - groups svg elements */ }

                { pieChart( data ).map( (d, i) => (
                    <g key={ i } className="arc">
                        <path
                            d={ dataArc(d) } 
                            fill={ color(d.data.title) }
                        />

                        <text
                            dy=".35em"
                            transform={ `translate(${ labelArc.centroid(d) })`}
                        >{ d.data.title }</text>
                    </g>
                ) ) }

            </g>
            <g>
                <circle cx="50" cy="50" r="40" stroke="red" strokeWidth="4" fill="pink" />
            </g>
        </svg>
    )
}

export default RatingsGraph;