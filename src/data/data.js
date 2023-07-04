const data = [
  {
    imagePath: '/images/hamid-mir.jpg',
    percentage: 98,
    id: 'hamid-mir',
  },
  {
    imagePath: '/images/shahbaz.jpg',
    percentage: 76,
    id: 'shahbaz',
  },
  {
    imagePath: '/images/imran.jpg',
    percentage: 88,
    id: 'imran',
  },
  {
    imagePath: '/images/zardari.jpg',
    percentage: 0,
    id: 'unknown',
  },
  {
    imagePath: '/images/nawaz-shareef.jpg',
    percentage: 3,
    id: 'nawaz',
  },
  {
    imagePath: '/images/bilawal-bhutto.jpg',
    percentage: 49,
    id: 'bilawal',
  },
  {
    imagePath: '/images/ahsan-iqbal.jpg',
    percentage: 50,
    id: 'ahsan-iqbal',
  },
  {
    imagePath: '/images/imran-riaz.jpg',
    percentage: 88,
    id: 'imran-riaz',
  },
];

// Add _id property with incremental values
export const facesData = data.map((item, index) => ({
  _id: index + 1,
  ...item,
}));
