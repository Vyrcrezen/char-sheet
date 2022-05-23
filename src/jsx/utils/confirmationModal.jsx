import React from 'react';
import PropTypes from 'prop-types';

export function ConfirmationModal({ confirmationModalContent }) {
    return (
        <div className="modal fade" id="confirmationModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog modal-md modal-fullscreen-lg-down">
                <div className="modal-content vy-bg-secondary-light">
                    <div className="modal-header">
                        <span>Please confirm</span>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                    </div>
                    <div className="modal-body">
                        <span>{confirmationModalContent.text}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={confirmationModalContent.funSelectedYes}>Yes</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfirmationModal.propTypes = {
    confirmationModalContent: PropTypes.shape({
        text: PropTypes.string.isRequired,
        funSelectedYes: PropTypes.func.isRequired,
    }).isRequired,
};
