import { connect } from "react-redux";

import Pane from "../components/Pane";

import { receiveLayout } from "../actions";

const mapStateToProps = ({ pane }) => ({
  value: pane.get("layout"),
  meta: pane.get("meta")
});

const mapDispatchToProps = dispatch => ({
  onChange: layout => dispatch(receiveLayout(layout))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pane);
