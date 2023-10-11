precision mediump float;

uniform vec3 uSurfaceColor;
uniform vec3 uDeepColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main(){
    float mixedStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDeepColor, uSurfaceColor, mixedStrength);
    gl_FragColor = vec4(color, 1.0);
}