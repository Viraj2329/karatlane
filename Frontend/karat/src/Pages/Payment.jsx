import {
  Box,
  FormControl,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  FormLabel,
  Select,
  Grid,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { handleUserPayment } from "../redux/Auth/action";

const Payment = () => {
  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const dispatch = useDispatch();
  const toast = useToast();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    try {
      const response = await fetch("https://viraj-karat-backend.vercel.app/cart/getCart");
      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartItems);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast({
        position: "top",
        title: "Error",
        description: "Failed to fetch cart items",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Calculate total discounted price
  const total = cartItems.reduce((acc, item) => {
    const discountPrice = item.DiscountPrice || 0; // Handle null/undefined values
    return acc + (discountPrice * (item.quantity || 1)); // Multiply by quantity if available
  }, 0);

  const totalmain = cartItems.reduce((acc, item) => acc + item.Price, 0);

  const Tsave = totalmain - total;

  const handlePayment = async () => {
    const products = cartItems.map(item => ({
      productId: item._id,
      quantity: 1 // You may want to add quantity to cart items
    }));

    let orderData = {
      first_name: firstName,
      last_name: lastName,
      city: city,
      address: street + " " + city + " " + state,
      pincode: +pincode,
      country,
    };

    try {
      const response = await fetch("https://viraj-karat-backend.vercel.app/order/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast({
          position: "top",
          title: "Order placed",
          description: "Successful",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        // Clear cart after successful order
        // localStorage.removeItem("cartItems");
        // setCartItems([]);

        console.log("Order placed successfully!");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast({
        position: "top",
        title: "Error",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
        }}
        alignItems="center"
        gap={"20px"}
        margin="auto"
        paddingTop={"100px"}
      >
        <Stack
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
          }}
          width={"35%"}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"2xl"} textAlign={"center"} color="blk">
                Shipping Address
              </Heading>
            </Stack>

            <Stack
              spacing={4}
              width={{ base: "300px", md: "400px", lg: "450px" }}
            >
              <FormControl id="firstName">
                {/* <FormLabel>First Name</FormLabel> */}
                <Input
                  width={"100%"}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  value={firstName}
                  onChange={(e) => setFirsName(e.target.value)}
                  placeholder="First name"
                />
              </FormControl>

              <FormControl id="lastName">
                {/* <FormLabel>Last Name</FormLabel> */}
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Last name"
                />
              </FormControl>

              <FormControl id="phone" isRequired>
                {/* <FormLabel>Phone number</FormLabel> */}
                <Input
                  value={phone}
                  onChange={(e) => setPhone(Number(e.target.value))}
                  type="number"
                  maxLength={"10"}
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Phone number"
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                {/* <FormLabel>Phone number</FormLabel> */}
                <Input
                  value={street}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Street & House no"
                  onChange={(e) => setStreet(e.target.value)}
                />
              </FormControl>
              <FormControl id="city" isRequired>
                {/* <FormLabel>City</FormLabel> */}
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Enter city"
                />
              </FormControl>
              <FormControl id="state" isRequired>
                {/* <FormLabel>State</FormLabel> */}
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Enter State"
                />
              </FormControl>

              <FormControl id="pincode" isRequired>
                {/* <FormLabel>City</FormLabel> */}
                <Input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Pincode"
                />
              </FormControl>
              <FormControl id="country" isRequired>
                {/* <FormLabel>State</FormLabel> */}
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  borderRadius={"none"}
                  border={"1px solid gray"}
                  focusBorderColor="gray.400"
                  placeholder="Country"
                />
              </FormControl>

              <Stack spacing={10} pt={2}></Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={"15px"} m={"auto"}>
          <Select placeholder="Select payment method">
            <option value="option1">Cash on Delivery</option>
            <option value="option2">UPI</option>
            <option value="option3">CARD</option>
          </Select>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormLabel>CARD DETAILS</FormLabel>
                <FormControl id="fullname" isRequired>
                  {/* <FormLabel>First Name</FormLabel> */}
                  <Input
                    type="text"
                    borderRadius={"none"}
                    border={"1px solid gray"}
                    focusBorderColor="gray.400"
                    placeholder="Full Name"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormLabel>CVV</FormLabel>
                <FormControl id="cvv">
                  {/* <FormLabel>Last Name</FormLabel> */}
                  <Input
                    type="number"
                    maxLength={"3"}
                    borderRadius={"none"}
                    border={"1px solid gray"}
                    focusBorderColor="gray.400"
                    placeholder="CVV"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="cardnumber" isRequired>
              {/* <FormLabel>Phone number</FormLabel> */}
              <Input
                type="number"
                maxLength={"10"}
                borderRadius={"none"}
                border={"1px solid gray"}
                focusBorderColor="gray.400"
                placeholder="Card number"
              />
            </FormControl>
            <Button
              loadingText="Submitting"
              size="lg"
              bgImage={"linear-gradient(to right, #d758e6, #3963f7 )"}
              color={"white"}
              _hover={{
                color: "#262b2b",
              }}
              onClick={() => handlePayment()}
            >
              Continue
            </Button>
            <Stack spacing={10} pt={2}></Stack>
          </Stack>
        </Stack>
        <Grid m={"auto"}>
          <TableContainer>
            <Table
              variant="simple"
              colorScheme="teal"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            >
              <TableCaption>
                You are our lucky customer ! stay connected
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>SUB TOTAL</Th>

                  <Th isNumeric> ₹ {totalmain}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>CART DISCOUNT</Td>

                  <Td isNumeric>₹ {Tsave}</Td>
                </Tr>
                <Tr>
                  <Td>SHIPPING CHARGES</Td>

                  <Td isNumeric>FREE</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>TOTAL COAST</Th>

                  <Th isNumeric> ₹{total} </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Grid>
      </Flex>
      <Footer />
    </>
  );
};

export default Payment;
