import tracer from 'dd-trace';

console.log('before', tracer);
tracer.init();
console.log('after', tracer);

export default tracer;
