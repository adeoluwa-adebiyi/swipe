import {useMediaQuery} from "react-responsive";
export default () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return {
        isTabletOrMobile,
        isTablet,
        isMobile
    }
}