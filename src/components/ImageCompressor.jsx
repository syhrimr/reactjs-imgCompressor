import React from 'react';
import imageCompression from 'browser-image-compression';
import { Alert, Card } from 'react-bootstrap';

// import logo from '../img/upload-image.png';

export default class imageCompressor extends React.Component {
    constructor() {
        super();
        this.state = {
            //compressedLink: logo, //placeholder <div>Icons made by <a href="https://www.flaticon.com/authors/smartline" title="Smartline">Smartline</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            originalImage: "",
            originalLink: "",
            clicked: false,
            uploadImage: false,
        };
    }

    handle = e => {
        const imageFile = e.target.files[0];
        this.setState({
            originalLink: URL.createObjectURL(imageFile),
            originalImage: imageFile,
            outputFileName: imageFile.name,
            uploadImage: true
        });
    };

    changeValue = e => {
        this.setState({ [e.target.name]: e.target.value});
    }

    click = e => {
        e.preventDefault();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
            alert("Image is too small, cannot be compressed!");
            return 0;
        }

        let output;
        imageCompression(this.state.originalImage, options).then(x => {
            output = x;

            const downloadLink = URL.createObjectURL(output);
            this.setState({
                compressedLink: downloadLink,
            });
        });

        this.setState({ clicked: true, });
        return 1;
    }

    render() {
        return(
            <div className='m-5'>
                <div className='row mt-5'>
                    <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div className='d-flex justify-content-center upload-file'>
                            <input
                                type='file'
                                accept='image/*'
                                className='mt-2 btn btn-dark w-100'
                                onChange={e => this.handle(e)}
                            />
                        </div>
                    </div>

                    <div className='col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline'>
                        <br />
                        {this.state.outputFileName ? (
                            <button
                                type='button'
                                className='btn btn-dark'
                                onClick={e => this.click(e)}
                            >
                            Compress
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
                        <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
                        {this.state.clicked ? (
                        <div className="d-flex justify-content-center">
                            <a
                            href={this.state.compressedLink}
                            download={this.state.outputFileName}
                            className="mt-2 btn btn-dark w-75"
                            >
                            Download
                            </a>
                        </div>
                        ) : (
                        <></>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}