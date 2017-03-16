import React, {Component} from 'react';

export class EventDetailPhotosComponent extends Component {
  render() {
    return <div>


          <div className="row">
            <div className="col-md-12">
              <div id="grid" className="row">
                <div className="mix col-sm-3 page1 page4 margin30">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/2.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3 page2 page3 margin30">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/1.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3  page3 page2 margin30 ">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/3.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3  page4 margin30">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/4.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3 page1 margin30 ">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/5.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3  page2 margin30">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/6.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3  page3 margin30">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/7.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
                <div className="mix col-sm-3 page4  margin30">
                  <div className="item-img-wrap ">
                    <img src="/img/Photos/8.jpg" className="img-responsive" alt="workimg"/>
                      <div className="item-img-overlay">
                        <a href="#" className="show-image">
                          <span></span>
                        </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gallery-bottom">
            <div className="col-sm-6">
              <ul className="pagination">
                <li>
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 text-right">
              <em>Displaying 1 to 8 (of 100 photos)</em>
            </div>
          </div>



    </div>;
  }
}