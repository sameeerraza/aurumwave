import React from 'react'
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const CenterText = ({ text, buttonText, buttonURL }) => {

    return (
        <div className="fcc" style={{ padding: '15em', gap: '5em' }}>
            <h3>{text}</h3>
            {buttonText &&
                <Link to={buttonURL}>
                    <Button
                        text={buttonText}
                        style={{
                            backgroundColor: "var(--primary-bg-color)",
                            color: "var(--white-black-text-color)",
                            padding: ".75em 2em",
                        }}
                    />
                </Link>}
        </div>
    )
}

export default CenterText