import React from 'react';
import PropTypes from 'prop-types';

export function ImageDisplayModal({ modalImage }) {
    return (
        <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog modal-xl modal-fullscreen-lg-down">
                <div className="modal-content vy-bg-secondary-light">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                    </div>
                    <div className="modal-body">
                        <img className="w-100 p-2 m-0" src={modalImage} alt="modal display" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ClickableImage({
    className, style, src, alt, stateModalImage,
}) {
    const mButtonClassNames = 'w-100 p-0 btn';
    return (
        <button type="button" className={mButtonClassNames} data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => { stateModalImage.set(src); }}>
            <img className={className} style={style} src={src} alt={alt} />
        </button>
    );
}

ImageDisplayModal.propTypes = {
    modalImage: PropTypes.string.isRequired,
};

ClickableImage.propTypes = {
    className: PropTypes.string.isRequired,
    style: PropTypes.shape.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    stateModalImage: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
};
