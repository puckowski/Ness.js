const { transformNess } = require('../index.cjs');

console.log(transformNess(`
div {
    color: fa0000;

    ul,
    ol:first-child {
        background-color: dddddd;

        a,
        img {
            color: cc44cc;
        }

        @layer test {
            color: 333333;

            th,
            tbody {
                background-color: #444444;
            }

            background-color: #555555;
        }

        margin-bottom: 8px;
    }

    background-color: fafa00;

    small,
    span {
        color: ff00cc;
    }

    padding: 0.111rem;
}
`
));
