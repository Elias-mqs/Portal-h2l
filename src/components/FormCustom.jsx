import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";



function InputCustom({ label, n, t, ph, oC, v, }) {
    return (
        <FormControl>
            <FormLabel color='#003366' paddingBottom='5px'>{label}</FormLabel>
            <Input p='0 10px 0 10px' variant='flushed' name={n} type={t} placeholder={ph} value={v} onChange={oC} />
        </FormControl>
    )
}

// TREINANDO PROPS

function ButtonSub(t, w, h, bg, c, bR, fS, fW, hover, desc) {
    return (
        <Button
            type={t}
            w={w}
            h={h}
            bg={bg}
            color={c}
            borderRadius={bR}
            fontSize={fS}
            fontWeight={fW}
            _hover={hover}
        >{desc}</Button>
    )
}








export { InputCustom, ButtonSub };




