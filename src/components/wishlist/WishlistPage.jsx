"use client";

import {
    useEffect,
} from "react";

import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

import useWishlist from "@/hooks/useWishlist";

import WishlistGrid from "./WishlistGrid";
import EmptyWishlist from "./EmptyWishlist";

export default function WishlistPage() {
    const {
        wishlist,
        loading,
        pagination,
        fetchWishlist,
    } = useWishlist();

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <section className="py-8">
            <Container>
                <div className="mb-8 flex items-center justify-between">
                    <Text
                        variant="h3"
                        className="font-bold"
                    >
                        My Wishlist
                    </Text>

                    <Text>
                        {
                            pagination?.total_records
                        }{" "}
                        Items
                    </Text>
                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        Loading...
                    </div>
                ) : wishlist.length >
                    0 ? (
                    <WishlistGrid
                        wishlist={
                            wishlist
                        }
                    />
                ) : (
                    <EmptyWishlist
                        title="Your wishlist is empty"
                        description="Save products you love and purchase them later."
                        buttonText="Explore Products"
                        buttonLink="/products"
                    />
                )}
            </Container>
        </section>
    );
}