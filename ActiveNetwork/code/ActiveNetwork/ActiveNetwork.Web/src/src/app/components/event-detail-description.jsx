import React, { Component } from 'react';

export class EventDetailDescriptionComponent extends Component {
  componentWillMount() {
    this.setState({
      evemtDecription: {}
    });
  }

  async componentDidMount() {
    this.setState({evemtDecription: await this.getData()});
  }

  async getData() {
    let a = await ANEventDetailServiceInstance.getANEventDetailInformation('1');
    return a;
  }

  render() {
    return (<div className="row">
        <div className="col-md-12">
          <div className="widget">
            <div className="widget-body">
              <div className="row">
                <div className="col-md-4 col-md-5 col-xs-12">
                  <div className="row content-info">
                    <div className="col-xs-3">
                      Email:
                  </div>
                    <div className="col-xs-9">
                      example@yourdomain.com
                  </div>
                    <div className="col-xs-3">
                      Phone:
                  </div>
                    <div className="col-xs-9">
                      +1-800-600-9898
                  </div>
                    <div className="col-xs-3">
                      Address:
                  </div>
                    <div className="col-xs-9">
                      Sacramento, CA
                  </div>
                    <div className="col-xs-3">
                      Birthday:
                  </div>
                    <div className="col-xs-9">
                      1975/8/17
                  </div>
                    <div className="col-xs-3">
                      URL:
                  </div>
                    <div className="col-xs-9">
                      http://yourdomain.com
                  </div>
                    <div className="col-xs-3">
                      Job:
                  </div>
                    <div className="col-xs-9">
                      Ninja developer
                  </div>
                    <div className="col-xs-3">
                      Lives in:
                  </div>
                    <div className="col-xs-9">
                      Miami, FL, USA
                  </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-7 col-xs-12">
                  <p className="contact-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}