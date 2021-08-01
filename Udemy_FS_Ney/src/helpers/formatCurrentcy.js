export const formatCurrentcy = x => {
    x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return x;
}