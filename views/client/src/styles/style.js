import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  primaryFont: {
    fontFamily: 'googleSansRegular'
  },
  backgroundPrimary: {
    backgroundColor: '#ffffff'
  },
  bold: {
    fontFamily: 'googleSansBold'
  },
  italic: {
    fontFamily: 'googleSansItalic'
  },
  justified: {
    textAlign: 'justify',
  },
  headerTitle: {
    fontFamily: 'googleSansBold',
    fontSize: 20
  },
  padding5: {
    padding: 5
  },
  marginLeft20: {
    marginLeft: 20
  },
  fontWhite: {
    color: '#ffffff'
  },
  fontGrey: {
    color: '#7f8fa6'
  },
  listThumbNail: {
    borderRadius: 3,
    width       : 85,
    height      : 85,
    padding     : 5
  },
  detailsThumbNail: {
    height: 250,
    width : null
  },
  detailsHeadLine: {
    fontSize: 20,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#000000',
    borderRadius   : 2,
  },
  sliderWrapper: {
    height: 200,
    width: 330,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 5
  },
  sliderContent: {
    backgroundColor:'rgba(0,0,0,0.5)',
    padding: 10,
    position : 'absolute',
    bottom : 0,
    top : 0,
    left : 0,
    right : 0,
    justifyContent:'flex-end',
    borderRadius: 5
  },
  horizontalDivider: {
    borderWidth    : 0.5,
    borderColor    : '#e6e6e6',
    backgroundColor: '#e6e6e6',
    marginVertical: 10
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20
  },
  link: {
    color: '#0000EE',
    textDecorationLine: 'underline'
  },
  flexRow: {
    flexDirection: 'row'
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  spaceBetween: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
