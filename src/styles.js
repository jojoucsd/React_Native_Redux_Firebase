const React = require('react-native')
const { StyleSheet } = React
const constants = {
  actionColor: 'transparent'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch'
  },
})

module.exports = styles
module.exports.constants = constants;