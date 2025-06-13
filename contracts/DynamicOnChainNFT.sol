// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DynamicOnChainNFT is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("DynamicNFT", "DYN") {}

    function mint() public {
        _safeMint(msg.sender, _tokenIdCounter);
        _tokenIdCounter++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        // This will revert automatically if token doesn't exist
        address owner = ownerOf(tokenId);
        require(owner != address(0), "Token does not exist");

        string memory svg = generateSVG(tokenId);
        string memory image = svgToImageURI(svg);

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"Dynamic NFT #',
                        Strings.toString(tokenId),
                        '", "description":"A fully on-chain SVG NFT", "image":"',
                        image,
                        '"}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function generateSVG(
        uint256 tokenId
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">',
                    '<rect width="100%" height="100%" fill="hsl(',
                    Strings.toString((tokenId * 75) % 360),
                    ', 70%, 60%)"/>',
                    '<text x="10" y="20" font-size="16" fill="#fff">NFT #',
                    Strings.toString(tokenId),
                    "</text></svg>"
                )
            );
    }

    function svgToImageURI(
        string memory svg
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(bytes(svg))
                )
            );
    }
}
